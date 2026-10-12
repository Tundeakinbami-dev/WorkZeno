#![no_std]

#[cfg(test)]
mod test;

use soroban_sdk::{contract, contracterror, contractevent, contractimpl, contracttype, token, Address, Env, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum MilestoneState { Draft, Funded, Submitted, Approved, Disputed, Released, Refunded }

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Milestone { pub id: u32, pub amount: i128, pub deadline: u64, pub state: MilestoneState }

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Agreement { pub client: Address, pub freelancer: Address, pub token: Address, pub total: i128, pub funded: bool, pub cancelled: bool }

#[contracttype]
#[derive(Clone)]
enum DataKey { Agreement, Milestone(u32), MilestoneCount }

#[contracterror]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum EscrowError { AlreadyExists = 1, NotFound = 2, InvalidAmount = 3, InvalidMilestones = 4, InvalidState = 5, AlreadyFunded = 6, Cancelled = 7 }

#[contractevent]
pub struct EscrowCreated { pub client: Address, pub freelancer: Address, pub total: i128 }
#[contractevent]
pub struct MilestoneReleased { pub id: u32, pub amount: i128 }

#[contract]
pub struct WorkZenoEscrow;

fn agreement(env: &Env) -> Result<Agreement, EscrowError> { env.storage().instance().get(&DataKey::Agreement).ok_or(EscrowError::NotFound) }
fn milestone(env: &Env, id: u32) -> Result<Milestone, EscrowError> { env.storage().instance().get(&DataKey::Milestone(id)).ok_or(EscrowError::NotFound) }

#[contractimpl]
impl WorkZenoEscrow {
    pub fn create(env: Env, client: Address, freelancer: Address, token: Address, total: i128, milestones: Vec<Milestone>) -> Result<(), EscrowError> {
        if env.storage().instance().has(&DataKey::Agreement) { return Err(EscrowError::AlreadyExists); }
        client.require_auth();
        if total <= 0 || milestones.len() == 0 { return Err(EscrowError::InvalidAmount); }
        let mut allocated = 0i128;
        for item in milestones.iter() {
            if item.amount <= 0 || item.state != MilestoneState::Draft { return Err(EscrowError::InvalidMilestones); }
            allocated += item.amount;
            env.storage().instance().set(&DataKey::Milestone(item.id), &item);
        }
        if allocated != total { return Err(EscrowError::InvalidMilestones); }
        env.storage().instance().set(&DataKey::MilestoneCount, &milestones.len());
        env.storage().instance().set(&DataKey::Agreement, &Agreement { client: client.clone(), freelancer: freelancer.clone(), token, total, funded: false, cancelled: false });
        EscrowCreated { client, freelancer, total }.publish(&env); Ok(())
    }
    pub fn fund(env: Env) -> Result<(), EscrowError> {
        let mut item = agreement(&env)?; item.client.require_auth();
        if item.cancelled { return Err(EscrowError::Cancelled); } if item.funded { return Err(EscrowError::AlreadyFunded); }
        token::Client::new(&env, &item.token).transfer(&item.client, &env.current_contract_address(), &item.total);
        item.funded = true; env.storage().instance().set(&DataKey::Agreement, &item);
        let count: u32 = env.storage().instance().get(&DataKey::MilestoneCount).unwrap_or(0);
        for id in 0..count { let mut m = milestone(&env, id)?; m.state = MilestoneState::Funded; env.storage().instance().set(&DataKey::Milestone(id), &m); } Ok(())
    }
    pub fn submit(env: Env, id: u32) -> Result<(), EscrowError> {
        let item = agreement(&env)?; item.freelancer.require_auth(); let mut m = milestone(&env, id)?;
        if !item.funded || m.state != MilestoneState::Funded { return Err(EscrowError::InvalidState); }
        m.state = MilestoneState::Submitted; env.storage().instance().set(&DataKey::Milestone(id), &m); Ok(())
    }
    pub fn approve_and_release(env: Env, id: u32) -> Result<(), EscrowError> {
        let item = agreement(&env)?; item.client.require_auth(); let mut m = milestone(&env, id)?;
        if !item.funded || m.state != MilestoneState::Submitted { return Err(EscrowError::InvalidState); }
        m.state = MilestoneState::Approved; env.storage().instance().set(&DataKey::Milestone(id), &m);
        token::Client::new(&env, &item.token).transfer(&env.current_contract_address(), &item.freelancer, &m.amount);
        m.state = MilestoneState::Released; env.storage().instance().set(&DataKey::Milestone(id), &m);
        MilestoneReleased { id, amount: m.amount }.publish(&env); Ok(())
    }
    pub fn dispute(env: Env, by: Address, id: u32) -> Result<(), EscrowError> {
        let item = agreement(&env)?; by.require_auth(); if by != item.client && by != item.freelancer { return Err(EscrowError::InvalidState); }
        let mut m = milestone(&env, id)?; if m.state != MilestoneState::Submitted { return Err(EscrowError::InvalidState); }
        m.state = MilestoneState::Disputed; env.storage().instance().set(&DataKey::Milestone(id), &m); Ok(())
    }
    pub fn get_agreement(env: Env) -> Result<Agreement, EscrowError> { agreement(&env) }
    pub fn get_milestone(env: Env, id: u32) -> Result<Milestone, EscrowError> { milestone(&env, id) }
}

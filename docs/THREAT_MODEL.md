# Threat model

| Threat                       | Control                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| Client releases without work | Contract requires the client's signed approval; later add dispute policy before real use.                 |
| Freelancer self-releases     | Contract release path requires client authorization.                                                      |
| Duplicate payout             | State changes to `Released`, preventing a second call.                                                    |
| Amount mismatch              | Creation rejects milestone totals that do not equal the agreement total.                                  |
| Compromised web session      | Wallet signing is separate from application authentication; add secure sessions and step-up verification. |
| Misleading UI state          | Treat network submission as pending until receipt and contract state confirmation.                        |

Residual risk: the current contract has not been compiled, tested with token transfers, independently reviewed, or deployed. It is a development artifact only.

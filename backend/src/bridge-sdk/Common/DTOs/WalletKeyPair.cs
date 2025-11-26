namespace Common.DTOs;

/// <summary>
///     Represents a wallet key pair (private and public keys). This can be used for signing transactions.
/// </summary>
public sealed record WalletKeyPair
{
    public required byte[] PrivateKey { get; init; }
    public required byte[] PublicKey { get; init; }
    public required byte[] SeedPhrase { get; init; }
}

import { TOKEN_CLAIM_REPOSITORY } from "../constants";
import { TokenClaim } from "./token-claim.entity";

export const claimsProviders = [{
    provide: TOKEN_CLAIM_REPOSITORY,
    useValue: TokenClaim
}]
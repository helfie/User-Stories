import { TOKEN_IDENTITY_REPOSITORY } from "../constants";
import { TokenIdentity } from "./token-identity.entity";

export const identitysProviders = [{
    provide: TOKEN_IDENTITY_REPOSITORY,
    useValue: TokenIdentity
}]
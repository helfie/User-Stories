import { TOKEN_COMPLIANCE_REQUEST_REPOSITORY } from "../constants";
import { TokenComplianceRequest } from "./token-compliance-request.entity";

export const identitysProviders = [{
    provide: TOKEN_COMPLIANCE_REQUEST_REPOSITORY,
    useValue: TokenComplianceRequest
}]
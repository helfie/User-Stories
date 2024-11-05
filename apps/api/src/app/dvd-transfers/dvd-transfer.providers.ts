import { DVD_TRANSFER_REPOSITORY } from "../constants";
import { DvdTransfer } from "./dvd-transfer.entity";

export const obligationsProviders = [{
    provide: DVD_TRANSFER_REPOSITORY,
    useValue: DvdTransfer
}]
import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "../users/user.entity";
import { Obligation } from "../obligations/obligation.entity";
import { TokenIdentity } from "../token-identities/token-identity.entity";
import { TokenClaim } from "../token-claims/token-claim.entity";
import { TokenComplianceRequest } from "../token-compliance/token-compliance-request.entity";

@Table
export class Asset extends Model<Asset> {
    @PrimaryKey
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({type: String, example: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"})
    tokenAddress: string;
    @ForeignKey(() => User)
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({type: String, example: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"})
    userAddress: string;
    @ForeignKey(() => Obligation)
    @Column({type: DataType.INTEGER, allowNull: true})
    @ApiProperty({type: Number, example: 0})
    obligationId: number;
    @ForeignKey(() => TokenIdentity)
    @Column({type: DataType.STRING, allowNull: true})
    @ApiProperty({type: String, example: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"})
    identityAddress: string;
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({type: String, example: "Test_Asset"})
    name: string;
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({type: String, example: "TA"})
    symbol: string;
    @Column({type: DataType.SMALLINT, allowNull: false})
    @ApiProperty({type: Number, example: 18})
    decimals: number;
    // @Column({type: DataType.BIGINT, allowNull: false})
    // @ApiProperty({type: BigInt, example: 1})
    // amount: bigint;
    @Column({type: DataType.SMALLINT, allowNull: true})
    @ApiProperty({type: Number, example: 0})
    country: number;
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    @ApiProperty({type: Boolean, example: false})
    isVerified: boolean;
    @BelongsTo(() => User)
    user: User;
    @BelongsTo(() => Obligation)
    obligation: Obligation;
    @BelongsTo(() => TokenIdentity)
    identity: TokenIdentity;
    @HasMany(() => TokenClaim)
    claims: TokenClaim[];
    @HasMany(() => TokenComplianceRequest)
    tokenComplianceRequests: TokenComplianceRequest[];
}
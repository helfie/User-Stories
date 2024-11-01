import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "../users/user.entity";
import { Obligation } from "../obligations/obligation.entity";
import { TokenIdentity } from "../token-identities/token-identity.entity";
import { TokenClaim } from "../token-claims/token-claim.entity";

@Table
export class Asset extends Model<Asset> {
    @PrimaryKey
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({type: String, example: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"})
    tokenAddress: string;
    @ForeignKey(() => TokenIdentity)
    @Column({type: DataType.STRING, allowNull: true})
    @ApiProperty({type: String, example: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"})
    identityAddress: string;
    @ForeignKey(() => User)
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({type: String, example: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"})
    deployer: string;
    @ForeignKey(() => Obligation)
    @Column({type: DataType.INTEGER, allowNull: true})
    @ApiProperty({type: Number, example: 0})
    obligationId: number;
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({type: String, example: "Test_Asset"})
    name: string;
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({type: String, example: "This is a test asset"})
    description: string;
    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({type: String, example: "RWA test asset"})
    type: string;
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    @ApiProperty({type: Boolean, example: false})
    isVerified: boolean;
    @BelongsTo(() => User)
    user: User;
    @BelongsTo(() => Obligation)
    obligation: Obligation;
    @HasMany(() => TokenClaim)
    claims: TokenClaim[];
    @BelongsTo(() => TokenIdentity)
    identity: TokenIdentity;
}
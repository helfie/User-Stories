
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UnauthorizedException } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { SignatureService } from "../signatures/signature.service";
import { ApiService } from "../api/api.service";
import { Obligation } from "./obligation.entity";
import { CreateObligationDto } from "./dto/create-obligation.dto";
import { UpdateObligationDto } from "./dto/update-obligation.dto";

@ApiTags('Obligations')
@Controller('/obligations')
export class ObligationController {
    constructor(
        private readonly apiService: ApiService,
        private readonly signatureService: SignatureService) {
    }

    @Get('/')
    @ApiResponse({status: 200, description: 'all obligations', type: [Obligation]})
    @ApiOperation({summary: "retrieve all obligations"})
    @ApiQuery({name: 'withAssets', required: true, description: 'obligations with assets', type: Boolean, example: true})
    @ApiQuery({name: 'isNotExecuted', required: false, description: 'only is not executed obligations', type: Boolean, example: false})
    async getObligations(@Query('withAssets') withAssets: string, @Query('isNotExecuted') isNotExecuted: string | null) {
        const isNotExec = isNotExecuted !== null ? isNotExecuted === 'false' : null;
        return await this.apiService.findAllObligations({withAssets: withAssets === 'true', isExecuted: isNotExec});
    }

    @Get('/:tokenAddress')
    @ApiResponse({status: 200, description: 'asset obligations', type: Obligation})
    @ApiOperation({summary: "retrieve all asset obligations"})
    @ApiParam({name: 'tokenAddress', required: true, description: 'eth token address', type: String, example: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'})
    async getObligationByAsset(@Param('tokenAddress') tokenAddress: string) {
        return await this.apiService.findObligationByAsset({tokenAddress: tokenAddress});
    }

    @Get('obligation/:obligationId')
    @ApiResponse({status: 200, description: 'get obligation', type: Obligation})
    @ApiOperation({summary: "retrieve obligation by obligation id"})
    @ApiParam({name: 'obligationId', required: true, description: 'obligation id', type: Number, example: 0})
    async getObligationById(@Param('obligationId') obligationId: string) {
        return await this.apiService.findObligationById({obligationId: Number(obligationId)});
    }

    @Post('/add-obligation')
    @ApiResponse({status: 201, description: 'add asset obligation', type: Obligation})
    @ApiOperation({summary: "add asset obligation"})
    async createObligation(@Body() dto: CreateObligationDto) {
        if(!(await this.signatureService.verifySignature('addObligation', dto.signature, dto.userAddress))) {
            throw new UnauthorizedException(`User [${dto.userAddress}] not authorized`)
        } else if(!(await this.apiService.isUserExists({userAddress: dto.userAddress}))) {
            throw new BadRequestException(`User [${dto.userAddress}] does not exist`)
        } else if(!(await this.apiService.isUserVerified({userAddress: dto.userAddress}))) {
            throw new BadRequestException(`User [${dto.userAddress}] is not verified`)
        }
        return await this.apiService.createObligation({
            tokenAddress: dto.tokenAddress, 
            userAddress: dto.userAddress, 
            amount: dto.amount,
            txCount: dto.txCount
        });
    }

    @Patch('obligation/update-obligation')
    @ApiResponse({status: 200, description: 'update obligation', type: Obligation})
    @ApiOperation({summary: "update obligation by obligationId"})
    async updateObligation(@Body() dto: UpdateObligationDto) {
        if(!(await this.signatureService.verifySignature('updateObligation', dto.signature, dto.userAddress))) {
            throw new UnauthorizedException(`User [${dto.userAddress}] not authorized`)
        } else if(!(await this.apiService.isUserExists({userAddress: dto.userAddress}))) {
            throw new BadRequestException(`User [${dto.userAddress}] does not exist`)
        } else if(!(await this.apiService.isUserVerified({userAddress: dto.userAddress}))) {
            throw new BadRequestException(`User [${dto.userAddress}] is not verified`)
        } else if(!(await this.apiService.isObligationExists({obligationId: dto.obligationId}))) {
            throw new BadRequestException(`Obligation [${dto.obligationId}] does not exist`)
        } else if(!(await this.apiService.isObligationExecuted({obligationId: dto.obligationId}))) {
            throw new BadRequestException(`Obligation [${dto.obligationId}] is already executed`)
        } else if(!(await this.apiService.isObligationSeller({obligationId: dto.obligationId, userAddress: dto.userAddress}))) {
            throw new BadRequestException(`Obligation [${dto.obligationId}] is self bought`)
        }
        return await this.apiService.updateObligation({
            obligationId: dto.obligationId,
            userAddress: dto.userAddress
        });
    }
}
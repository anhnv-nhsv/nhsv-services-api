import { mixin } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';

type Constructor<T = object> = new (...args: any[]) => T;

export function BaseResponse<TBase extends Constructor>(Base: TBase, options?: ApiPropertyOptions | undefined) {
  class ResponseDTO {
    @ApiProperty({ description: 'Mã lỗi thực hiện API', example: '0000' })
    @IsString()
    error_code!: string;

    @ApiProperty({
      description: 'Nội dung mã lỗi',
      example: '[XXXX]Thực hiện thành công',
    })
    @IsString()
    error_desc!: string;

    @ApiProperty({
      description: 'Trạng thái thực hiện API',
      example: true,
    })
    @IsBoolean()
    success!: boolean;

    @ApiProperty({
      isArray: true,
      type: Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested({ each: true })
    data_list!: Array<InstanceType<TBase>>;
  }
  return mixin(ResponseDTO); // This is important otherwise you will get always the same instance
}

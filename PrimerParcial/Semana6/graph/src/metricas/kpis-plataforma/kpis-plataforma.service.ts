import { Injectable } from '@nestjs/common';
import { CreateKpisPlataformaInput } from './dto/create-kpis-plataforma.input';
import { UpdateKpisPlataformaInput } from './dto/update-kpis-plataforma.input';

@Injectable()
export class KpisPlataformaService {
  create(createKpisPlataformaInput: CreateKpisPlataformaInput) {
    return 'This action adds a new kpisPlataforma';
  }

  findAll() {
    return `This action returns all kpisPlataforma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kpisPlataforma`;
  }

  update(id: number, updateKpisPlataformaInput: UpdateKpisPlataformaInput) {
    return `This action updates a #${id} kpisPlataforma`;
  }

  remove(id: number) {
    return `This action removes a #${id} kpisPlataforma`;
  }
}

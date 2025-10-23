import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { KpisPlataformaService } from './kpis-plataforma.service';
import { KpisPlataforma } from './entities/kpis-plataforma.entity';
import { CreateKpisPlataformaInput } from './dto/create-kpis-plataforma.input';
import { UpdateKpisPlataformaInput } from './dto/update-kpis-plataforma.input';

@Resolver(() => KpisPlataforma)
export class KpisPlataformaResolver {
  constructor(private readonly kpisPlataformaService: KpisPlataformaService) {}

  @Mutation(() => KpisPlataforma)
  createKpisPlataforma(@Args('createKpisPlataformaInput') createKpisPlataformaInput: CreateKpisPlataformaInput) {
    return this.kpisPlataformaService.create(createKpisPlataformaInput);
  }

  @Query(() => [KpisPlataforma], { name: 'kpisPlataforma' })
  findAll() {
    return this.kpisPlataformaService.findAll();
  }

  @Query(() => KpisPlataforma, { name: 'kpisPlataforma' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.kpisPlataformaService.findOne(id);
  }

  @Mutation(() => KpisPlataforma)
  updateKpisPlataforma(@Args('updateKpisPlataformaInput') updateKpisPlataformaInput: UpdateKpisPlataformaInput) {
    return this.kpisPlataformaService.update(updateKpisPlataformaInput.id, updateKpisPlataformaInput);
  }

  @Mutation(() => KpisPlataforma)
  removeKpisPlataforma(@Args('id', { type: () => Int }) id: number) {
    return this.kpisPlataformaService.remove(id);
  }
}

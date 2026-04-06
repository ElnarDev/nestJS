import { Injectable } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async findAll() {
    return await this.usuarioRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(id: number) {
    return await this.usuarioRepo.findOneBy({ id });
  }

  async createAndUpdate(dto: UsuarioDto) {
    const exists = await this.usuarioRepo.findOneBy({ id: dto.id });

    if (exists) {
      Object.assign(exists, dto);
      return await this.usuarioRepo.save(exists);
    } else {
      const newUsuario = this.usuarioRepo.create(dto);
      return await this.usuarioRepo.save(newUsuario);
    }
  }

  async delete(id: number) {
    await this.usuarioRepo.delete({ id });
    return { message: `Usuario with id ${id} removed` };
  }
}

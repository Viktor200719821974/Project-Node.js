import { model } from '../models/models';
import { IType } from '../interfaces';

class TypeService {
    async getAll() {
        return model.Type.findAll();
    }

    async createType(name: string): Promise<IType> {
        // @ts-ignore
        return model.Type.create({ name });
    }

    async updateType(name: string, id: string) {
        await model.Type.update(
            {
                name,
            },
            {
                where: { id },
            },
        );
        return model.Type.findByPk(id);
    }

    async deleteType(id: string) {
        await model.Type.destroy({ where: { id } });
    }
}
export const typeService = new TypeService();

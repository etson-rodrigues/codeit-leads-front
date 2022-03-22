import { PerfisListResponse } from 'src/app/core/models/perfil/perfil-response.model';

export const mockPerfisListResponse: PerfisListResponse = {
    data: [
        {
            codigo: '001',
            descricao: 'Administrador'
        },
        {
            codigo: '002',
            descricao: 'Operador'
        }
    ]
};

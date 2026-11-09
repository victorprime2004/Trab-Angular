export interface Colaborador{
    id: number;
    nome: string;
    email: string;
    dataNascimento: string | null;
    rg: string | null;
    cpf: string | null;
    createdAt: string;
    updateAt: string;
    enderecos: unknown[];
    contatos: unknown[];
}
import { MatPaginator } from '@angular/material/paginator';

export function setPaginatorConfig(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'Primeira página';
    paginator._intl.lastPageLabel = 'Última página';
    paginator._intl.nextPageLabel = 'Próxima página';
    paginator._intl.previousPageLabel = 'Página anterior';
    paginator._intl.getRangeLabel = getRangeDisplayText;
}

function getRangeDisplayText(page: number, pageSize: number, length: number) {
    if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
}

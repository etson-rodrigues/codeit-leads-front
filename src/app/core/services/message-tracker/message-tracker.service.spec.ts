import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { mockError } from '../../mocks/data/error-mock';
import { MessageTrackerService } from './message-tracker.service';

describe('MessageTrackerService', () => {
    let service: MessageTrackerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule, BrowserAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA]
        });
        service = TestBed.inject(MessageTrackerService);
    });

    it('[CIT-5596] deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    it('[CIT-5596] deve iniciar o serviço com a variável _loadError com valor false', () => {
        expect(service['_loadError']).toBeFalsy();
    });

    it('[CIT-5596] deve exibir o erro', () => {
        expect(service['_loadError']).toBeFalsy();

        service.subscribeError(mockError);

        expect(service['_loadError']).toBeTruthy();
    });

    it('[CIT-5596] não deve exibir o erro caso a variável _loadError esteja com valor true', fakeAsync(() => {
        service['_loadError'] = true;

        expect(service['_loadError']).toBeTruthy();

        service.subscribeError(mockError);

        flush();

        expect(service['_loadError']).toBeFalsy();
    }));
});

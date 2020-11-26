import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ReportHistoryPage} from './report-history.page';

describe('ReportHistoryPage', () => {
    let component: ReportHistoryPage;
    let fixture: ComponentFixture<ReportHistoryPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReportHistoryPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ReportHistoryPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

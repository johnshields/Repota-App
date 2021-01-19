import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DisplayReportPage} from './display-report.page';

describe('DisplayReportPage', () => {
    let component: DisplayReportPage;
    let fixture: ComponentFixture<DisplayReportPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DisplayReportPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(DisplayReportPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

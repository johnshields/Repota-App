import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DisplayPage} from './display.page';

describe('DisplayPage', () => {
    let component: DisplayPage;
    let fixture: ComponentFixture<DisplayPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DisplayPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(DisplayPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

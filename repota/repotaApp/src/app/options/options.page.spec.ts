import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

import {OptionsPage} from './options.page';

describe('OptionsPage', () => {
    let component: OptionsPage;
    let fixture: ComponentFixture<OptionsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OptionsPage],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
        }).compileComponents();

        fixture = TestBed.createComponent(OptionsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

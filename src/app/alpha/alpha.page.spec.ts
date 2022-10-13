import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AlphaPage } from './alpha.page';

describe('ExplorePage', () => {
  let component: AlphaPage;
  let fixture: ComponentFixture<AlphaPage>;

  beforeEach(waitForAsync(() => {
    const config = {
      declarations: [
        AlphaPage,
      ],
      imports: [
        IonicModule.forRoot(),
      ],
    };
    TestBed.configureTestingModule(config).compileComponents();

    fixture = TestBed.createComponent(AlphaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct page title', () => {
    const pageTitle = 'Test Page Title';
    component.pageTitle = pageTitle;
    fixture.detectChanges();

    const headerText = fixture.nativeElement.querySelector('.header__text').textContent;
    expect(headerText).toContain(pageTitle);
  });

});

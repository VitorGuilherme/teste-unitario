import { ListInvestmentsService } from './../../services/list-investments.service';
import { MOCK_LIST } from './../../services/list-investments.mock';
import { Investments } from './../../model/investments';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';

const mockList: Array<Investments> = MOCK_LIST;

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: ListInvestmentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    service = TestBed.inject(ListInvestmentsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U)should list investments', () => {
    spyOn(service, 'list').and.returnValue(of(mockList));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.list).toHaveBeenCalledWith();
    expect(component.investments.length).toEqual(5);
    expect(component.investments[0].name).toEqual('Banco 1');
    expect(component.investments[0].value).toEqual(100);
    expect(component.investments[4].name).toEqual('Banco 5');
    expect(component.investments[4].value).toEqual(100);
  });

  it('(I) should list investments', () => {
    spyOn(service, 'list').and.returnValue(of(mockList));

    component.ngOnInit();
    fixture.detectChanges();


    let investments = fixture.debugElement.nativeElement.querySelectorAll('.list-itens')

    expect(investments.length).toEqual(5);
    expect(investments[0].textContent.trim()).toEqual('Banco 1 | 100');
    expect(investments[4].textContent.trim()).toEqual('Banco 5 | 100');
  });
});
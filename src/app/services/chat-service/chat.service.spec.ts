import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatService]
    });
    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding.
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAPi and return the result', () => {
    const dummyResponse = [{ id: 1, name: 'John Doe' }];
    const url = 'getAllUser';

    service.getAPi(url).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}${url}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse); // Respond with the mock data
  });

  it('should call postApi and return the result', () => {
    const dummyResponse = { success: true };
    const url = 'get-friends';
    const payload = { id: '123' };

    service.postApi(payload, url).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}${url}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(dummyResponse); // Respond with the mock data
  });
});

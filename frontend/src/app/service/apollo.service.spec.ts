import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { ApolloService } from './apollo.service';
import { InMemoryCache } from '@apollo/client/core';
import { TestScheduler } from 'rxjs/testing';

describe('ApolloService', () => {
  let service: ApolloService;
  let apollo: Apollo;
  let cache: InMemoryCache;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apollo, ApolloService],
    });
    service = TestBed.inject(ApolloService);
    apollo = TestBed.inject(Apollo);
    cache = new InMemoryCache();
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
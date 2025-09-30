import { TestBed } from '@angular/core/testing';
import { 
  HttpClientTestingModule, 
  HttpTestingController 
} from '@angular/common/http/testing';
import { DataService, User, Post } from './data.service';
import { environment } from '../../environments/environment';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.reqresApiUrl + '/' + environment.apiVersion;
  const jsonServerUrl = environment.jsonServerApiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getReqresUsers', () => {
    it('should return users with default pagination', () => {
      const mockResponse = {
        data: [
          { id: 1, name: 'John', email: 'john@test.com', avatar: 'avatar1.jpg' },
          { id: 2, name: 'Jane', email: 'jane@test.com', avatar: 'avatar2.jpg' }
        ],
        page: 1,
        per_page: 6,
        total: 12,
        total_pages: 2
      };

      service.getReqresUsers().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.data.length).toBe(2);
      });

      const req = httpMock.expectOne(`${apiUrl}/users?page=1&per_page=6`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors', () => {
      const errorMessage = 'Error fetching users';
      
      service.getReqresUsers().subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: Error) => {
          expect(error.message).toContain('Something went wrong');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/users?page=1&per_page=6`);
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getReqresUser', () => {
    it('should return a single user by id', () => {
      const userId = 1;
      const mockUser = {
        data: {
          id: userId,
          name: 'John',
          email: 'john@test.com',
          avatar: 'avatar1.jpg'
        }
      };

      service.getReqresUser(userId).subscribe(response => {
        expect(response).toEqual(mockUser);
        expect(response.data.id).toBe(userId);
      });

      const req = httpMock.expectOne(`${apiUrl}/users/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });

  describe('getJsonServerPosts', () => {
    it('should return posts from JSON Server', () => {
      const mockPosts: Post[] = [
        { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 },
        { id: 2, title: 'Post 2', body: 'Content 2', userId: 2 }
      ];

      service.getJsonServerPosts().subscribe(posts => {
        expect(posts.length).toBe(2);
        expect(posts).toEqual(mockPosts);
      });

      const req = httpMock.expectOne(`${jsonServerUrl}/posts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);
    });

    it('should return empty array on error', () => {
      service.getJsonServerPosts().subscribe(posts => {
        expect(posts).toEqual([]);
      });

      const req = httpMock.expectOne(`${jsonServerUrl}/posts`);
      req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('createPost', () => {
    it('should create a new post', () => {
      const newPost: Omit<Post, 'id'> = {
        title: 'New Post',
        body: 'Post content',
        userId: 1
      };

      const createdPost: Post = {
        id: 101,
        ...newPost
      };

      service.createPost(newPost).subscribe(post => {
        expect(post).toEqual(createdPost);
      });

      const req = httpMock.expectOne(`${jsonServerUrl}/posts`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newPost);
      req.flush(createdPost);
    });
  });
});

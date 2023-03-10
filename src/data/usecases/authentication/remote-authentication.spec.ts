interface HttpPostClient {
  post (url: string): Promise<void>
}

class RemoteAuthentication {
   constructor (
    private readonly url : string,
    private readonly httpPostClient : HttpPostClient
    ) {}

  async auth(): Promise<void> { 
    await this.httpPostClient.post(this.url)    
  }
}

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with corret URL', async () => {
        class HttpPostClientSpy implements HttpPostClient {
           url?: string
           async post (url: string): Promise<void> {
              this.url = url
              return Promise.resolve()
           }
        } 
        const url = 'any_url'
        const httpPostClientSpy = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        await sut.auth() 
        expect(httpPostClientSpy.url).toBe(url)
     })
});
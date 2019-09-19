using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace DitchingJavaScript.Web
{
    public static class HttpHelpers
    {
        public static async Task<T> GetJsonAsync<T>(this IHttpClientFactory factory, string url)
        {
            using var client = factory.CreateClient();
            using var request = new HttpRequestMessage(HttpMethod.Get, url);
            using var response = await client.SendAsync(request);
            
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsAsync<T>();
            
            return result;
        }

        public static async Task DeleteAsync(this IHttpClientFactory factory, string url)
        {
            using var client = factory.CreateClient();
            using var request = new HttpRequestMessage(HttpMethod.Delete, url);
            using var response = await client.SendAsync(request);
            
            response.EnsureSuccessStatusCode();
        }

        public static async Task<T> PutJsonAsync<T>(this IHttpClientFactory factory, string url, T body)
        {
            using var client = factory.CreateClient();
            using var request = new HttpRequestMessage(HttpMethod.Put, url);
            using var httpContent = CreateHttpContent(body);
            
            request.Content = httpContent;
            
            using var response = await client.SendAsync(request);

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsAsync<T>();
            return result;
        }

        public static async Task<T1> PostJsonAsync<T1, T2>(this IHttpClientFactory factory, string url, T2 body)
        {
            using var client = factory.CreateClient();
            using var request = new HttpRequestMessage(HttpMethod.Post, url);
            using var httpContent = CreateHttpContent(body);
            
            request.Content = httpContent;
            
            using var response = await client.SendAsync(request);

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsAsync<T1>();
            return result;
        }

        private static HttpContent CreateHttpContent<T>(T content)
        {
            HttpContent httpContent = null;

            if (content != null)
            {
                var ms = SerializeJson(content);
                ms.Seek(0, SeekOrigin.Begin);
                httpContent = new StreamContent(ms);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            }

            return httpContent;
        }

        private static MemoryStream SerializeJson<T>(T value)
        {
            var stream = new MemoryStream();

            using (var sw = new StreamWriter(stream, new UTF8Encoding(false), 1024, true))
            using (var jtw = new JsonTextWriter(sw) { Formatting = Formatting.None })
            {
                var js = new JsonSerializer();
                js.Serialize(jtw, value);
                jtw.Flush();
            }

            return stream;
        }
    }
}

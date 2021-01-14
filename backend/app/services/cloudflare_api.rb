class CloudflareAPI
  attr_reader :connection, :response

  def initialize(email: nil, api_key: nil, api_token: nil)
    if api_token.present?
      headers = {
          'Authorization': "Bearer #{api_token}"
      }
    else
      headers = {
          'X-Auth-Email': email,
          'X-Auth-Key':   api_key
      }
    end
    base_url    = 'https://api.cloudflare.com/client/v4/'
    @connection = Faraday.new(url: base_url, headers: headers) do |faraday|
      faraday.response :json
      faraday.adapter Faraday.default_adapter
    end
  end

  def user_details
    begin
      @response = connection.get('user')
      response.body
    rescue
      { success: false, error: ['Invalid response'] }
    end
  end

  def zones
    begin
      @response = connection.get('zones?per_page=1000')
      response.body
    rescue
      { success: false, error: ['Invalid response'] }
    end
  end

end

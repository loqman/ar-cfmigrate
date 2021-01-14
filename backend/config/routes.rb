Rails.application.routes.draw do
  scope :api do
    scope :v1 do
      scope :cloudflare do
        get '/user/details' => 'cloudflare#user_details'
        get '/zones' => 'cloudflare#zones'
      end
    end
  end
end

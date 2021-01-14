class CloudflareController < ApplicationController
  before_action :set_api

  def user_details
    render json: @api.user_details
  end

  def zones
    render json: @api.zones
  end

  private
  def set_api
    @api = CloudflareAPI.new(email: params[:email], api_key: params[:api_key], api_token: params[:api_token])
  end
end

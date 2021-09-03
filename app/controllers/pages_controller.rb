class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :travelpass]

  def home
    @home = true
  end

  def travelpass

  end
end

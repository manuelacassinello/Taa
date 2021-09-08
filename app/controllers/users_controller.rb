class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def my_trips
	  @my_trips = current_user.journeys.where(selected: true)
  end
end

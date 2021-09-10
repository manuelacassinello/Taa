class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def my_trips
	  my_trips = current_user.journeys.where(selected: true)
    @my_trips = my_trips.order(created_at: :desc)
  end

  def my_tree
  end

end

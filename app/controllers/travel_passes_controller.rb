class TravelPassesController < ApplicationController

  def show
   @travelpass = TravelPass.find(params[:id])
  end
end

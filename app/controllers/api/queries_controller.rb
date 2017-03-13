class Api::QueriesController < ApplicationController
  def show
    @query = Query.find(params[:id])
    render json: QueryRunner.execute(@query.statement, request.query_parameters)
  end
end

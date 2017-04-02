class QueriesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:preview]

  def index
    @queries = Query.page(params[:page])
  end

  def show
    find_query
  end

  def new
    @query = Query.new
  end

  def create
    if @query = Query.create(query_params)
      redirect_to edit_query_path(@query), notice: 'Query created'
    else
      render :new
    end
  end

  def edit
    find_query
  end

  def update
    find_query
    if @query.update(query_params)
      redirect_to query_path(@query), notice: 'Query updated'
    else
      render :edit
    end
  end

  def destroy
    find_query
    @query.destroy
    redirect_to queries_path, notice: 'Query deleted'
  end

  def preview
    render json: QueryRunner.execute(params[:statement], params[:sample].try(:to_unsafe_h))
  end

  private

  def find_query
    @query = Query.find(params[:id])
  end

  def query_params
    params.require(:query).permit!
  end
end

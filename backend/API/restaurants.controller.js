import RestaurantsDAO from "../DAO/restaurantsDAO.js";

export default class RestaurantsController{
    static async apiGetRestaurants(req, res, next){
        const restaurantsPerPage = req.query.restaurantsPerPage 
            ? parseInt(req.query.restaurantsPerPage, 10) : 20;
        
        //request---------------page number
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        //filters----------------search
        let filters = {}
        if(req.query.cuisine){
            filters.cuisine = req.query.cuisine
        }else if(req.query.zipcode){
            filters.zipcode = req.query.zipcode
        }else if(req.query.name){
            filters.name = req.query.name
        }

        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage,
        });

        //prepare the response object
        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }
        res.json(response);
    }

    static async apiGetRestaurantById(req, res, next){
        try {
            let id = req.params.id || {};
            let restaurant = await RestaurantsDAO.getRestaurantByID(id);
            if(!restaurant){
                res.status(400).json({error: "Not Found"});
                return
            }
            res.json(restaurant);
        } catch (err) {
            console.log(`api, ${err}`);
            res.status(500).json({error: err});
        }
    }

    static async apiGetRestaurantCuisines(req, res, next){
        try {
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines);
        } catch (err) {
            console.log(`api, ${err}`);
            res.status(500).json({error: err});
        }
    }
}
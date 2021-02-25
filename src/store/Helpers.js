import axios from 'axios'
import _ from 'lodash'

const Helpers = {
    getList: async (query, startIndex) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}`, {
                params: {
                    key: process.env.REACT_APP_API_KEY
                }
            })
            return response.data
        } catch (err) {
            console.error(err)
            return false;
        }
    },

    makeQuery: (state) => {
        let query = ""

        for (let key in state) {
            if (state[key] !== "" && key !== "searchResults" && key !== "loading" && key !== "startIndex" && key !== "totalItems")
                query += `+${key}:${state[key]}`
        }

        return query.substring(1)
    },

    addOrSubtract: (value, operand) => {
        if (operand === "add")
            return value += 10
        return value -= 10
    },

    getId: async (id) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`, {
                params: {
                    key: process.env.REACT_APP_API_KEY
                }
            })
            return _.get(response, "data.volumeInfo")
        } catch (err) {
            console.error(err)
            return false;
        }
    }
}

export default Helpers
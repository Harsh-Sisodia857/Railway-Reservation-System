const distance = {
    Ghaziabad: {
        Delhi: {
            distance: "50"
        },
        Dehradun: {
            distance: "500"
        },
        Dwarka: {
            distance: "100"
        },
        Khurja: {
            distance: "70"
        },
        Meerut: {
            distance: "90"
        },
    },
    Delhi: {
        Ghaziabad: {
            distance: "50"
        },
        Dehradun: {
            distance: "500"
        },
        Dwarka: {
            distance: "100"
        },
        Khurja: {
            distance: "70"
        },
        Meerut: {
            distance: "90"
        },
    },
    Dehradun: {
        Ghaziabad: {
            distance: "50"
        },
        Delhi: {
            distance: "500"
        },
        Dwarka: {
            distance: "100"
        },
        Khurja: {
            distance: "70"
        },
        Meerut: {
            distance: "90"
        },
    },
    Dwarka: {
        Ghaziabad: {
            distance: "50"
        },
        Dehradun: {
            distance: "500"
        },
        Delhi: {
            distance: "100"
        },
        Khurja: {
            distance: "70"
        },
        Meerut: {
            distance: "90"
        },
    },
    Khurja: {
        Ghaziabad: {
            distance: "50"
        },
        Dehradun: {
            distance: "500"
        },
        Dwarka: {
            distance: "100"
        },
        Delhi: {
            distance: "70"
        },
        Meerut: {
            distance: "90"
        },
    },
    Meerut: {
        Ghaziabad: {
            distance: "50"
        },
        Dehradun: {
            distance: "500"
        },
        Dwarka: {
            distance: "100"
        },
        Delhi: {
            distance: "70"
        },
        Khurja: {
            distance: "90"
        },
    }
};

function getDistance(source, destination) {
    if (distance[source] && distance[source][destination]) {
        return distance[source][destination].distance;
    }
    else {
        return -1;
    }
}

function isTrainAvailable(source, destination) {
    if (distance[source] && distance[source][destination]) return true;
    return false;  
}

function calculateFarePrice(source, destination) {
    const distance = getDistance(source, destination); // assume getDistance is a separate function that returns the distance between two locations in kilometers
    const baseFare = 10; // the base fare for any trip
    const farePerKilometer = 2.5; // the fare charged for each kilometer of the trip
    const totalFare = baseFare + (farePerKilometer * distance);
    return totalFare;
}

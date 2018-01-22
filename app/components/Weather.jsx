var React = require('react');
var WeatherForm = require('WeatherForm');
var ErrorModal = require('ErrorModal');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
  getInitialState: function (){
    return{isLoading:false};
  },
  hendelLocation: function(location){
    var that = this;
    this.setState({isLoading:true, errorMessage: undefined});
    openWeatherMap.getTemp(location).then(function(temp){
      that.setState({
        location: location,
        temp: temp,
        isLoading: false
      });
    }, function(err){
      that.setState({
        isLoading:false,
        errorMessage: err.message
      });
    });

  },
  render: function(){
    var {isLoading, temp, location, errorMessage} = this.state;
    function renderMessage(){
      if (isLoading) {
        return <h3 className="text-center">Fetching weather ...</h3>
      } else if (temp && location) {

        return <WeatherMessage temp={temp} location={location}/>;
      }
    }

    function errorModel(){
      if (typeof errorMessage === 'string') {
        return(
          <ErrorModal message={errorMessage}/>
        )
      }
    }
    return (
      <div>
        <h3 className="home-title">Welcome to Weather App</h3>
        <WeatherForm onSearch={this.hendelLocation}/>
        {renderMessage()}
        {errorModel()}
      </div>
    );
  }
});

module.exports = Weather;

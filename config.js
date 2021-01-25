/*
* Create and and export configuration variables
*
*/

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort' : 7575,
  'httpsPort' : 7579,
  'envName' : 'staging'
}

// Production environment
environments.production = {
  'httpPort' : 5959,
  'httpsPort' : 5955,
  'envName' : 'production'
}

// Determine which environment was passed
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if one of the environments is set as before
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ?  environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;
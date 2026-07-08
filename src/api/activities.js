//* MY NOTES 
//? What HTTP method am I using?
/*GET → Read
POST → Create
DELETE → Remove
PUT/PATCH → Update
//? What resource am I targeting?
/activities → the collection
/activities/7 → one specific activity
//? Does the API need to know who I am?
If yes, include the Authorization header with the bearer token.
Does the API need to know which item?
If yes, include its ID in the URL. */

const API = import.meta.env.VITE_API;

/** Fetches an array of activities from the API. */
export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Deletes an activity by id.
 * A valid token is required.
 *
 * !Important:
 * The API will only allow the creator of the activity to delete it.
 * If the logged-in user did not create the activity, the API will reject the request.
 */
export async function deleteActivity(token, activityId) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }
//give me the collection of activities/activityId literally means 'delete "activity/5" for example
  const response = await fetch(API + "/activities/" + activityId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token, // Bearer is the one with the "pass" the bearer of the token to be authenticated
    },//Does user/bearer own activityId?
  });

  const result = await response.json();

  if (!response.ok) {
    throw Error(result.message);
  }

  return result;
}
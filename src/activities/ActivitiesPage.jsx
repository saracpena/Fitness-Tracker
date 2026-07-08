import { useState, useEffect } from "react";
/** Import the API helper functions.
// getActivities() fetches all activities.
// deleteActivity() sends a DELETE request to the API.
// These functions are available only inside this file.
// If a child component needs to delete an activity,
// we pass a callback (handleDeleteActivity) down as a prop. */
import { getActivities, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext"; //since the functionality is abtracted within AuthContext, let's import it and apply it.

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const { token } = useAuth(); //let's use it!

  const [activities, setActivities] = useState([]);

  const [ error, setError ] = useState(null);//let's keep that error state updated in case user is not owner of activity

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

 /**
   * Deletes one specific activity.
   *
   * activityId = the unique id of the activity the user clicked.
   * token = proves which logged-in user is making the request.
   *
   * Workflow:
   * 1. Clear any old error message.
   * 2. Send token + activityId to the API delete helper.
   * 3. If delete succeeds, re-fetch activities so the screen updates.
   * 4. If delete fails, save the error message in state so React can render it.
   */

 const handleDeleteActivity = async (activityId) => {
  try {
    setError(null);
    await deleteActivity(token, activityId);
    await syncActivities();
  } catch (error) {
    setError(error.message);
  }
 };

  return (
    <>
      <h1>Activities</h1>
      <div>
        {error && <p className="error">{error}</p>}
      </div>
      <ActivityList 
        activities={activities}
        token={token}
        deleteActivity = {handleDeleteActivity} /> {/* this passes the function down as a prop so later inside the child component we can pass activity.id to deleteActivity 
        i.e. Child component says: “User clicked this activity.”Parent component does: “I know how to delete it and refresh state.”*/}

      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}

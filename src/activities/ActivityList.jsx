

export default function ActivityList({ activities, deleteActivity, token }) { //we now want the child to be able to delete an activity which resides in parent 'ActivityPage'
  return (
    <ul>
      {activities.map((activity) => (
        /**
         * activity is one object from the activities array.
         * activity.id is the unique id needed to delete this exact activity.
         */
        <li key={activity.id}>{activity.name}
          {/*
            When clicked:
            - call the deleteActivity function from props
            - pass it this activity's id
            - the parent handles the API call and refresh
          */}
        <hr/>
        {/* only show delete button if token exists */}
        {token && ( 
        <button onClick={() => deleteActivity(activity.id)}>
          Delete Activity
        </button> )}
        </li>
      ))}
    </ul>
  );
}

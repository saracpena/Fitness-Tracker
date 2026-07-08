

export default function ActivityList({ activities, deleteActivity }) { //we now want the child to be able to delete an activity which resides in parent 'ActivityPage'
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>{activity.name}
        <hr/>
        <button onClick={() => deleteActivity(activity.id)}>
          Delete Activity
        </button>
        </li>
      ))}
    </ul>
  );
}

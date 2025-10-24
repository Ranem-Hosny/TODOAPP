import { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const handelDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleTask = () => {
    if (task.trim() === "" || description.trim() === "") {
      alert("Please enter task");
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: task,
      description: description,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setDescription("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "All") return true;
    if (filter === "Completed") return t.completed;
    if (filter === "Pending") return !t.completed;
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>To Do App</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleTask}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <View style={styles.tabs}>
          {["All", "Completed", "Pending"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, filter === tab && styles.activeTab]}
              onPress={() => setFilter(tab)}
            >
              <Text
                style={[styles.tabText, filter === tab && styles.activeTabText]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={filteredTasks}
            renderItem={({ item }) => (
              <View
                style={[styles.item, item.completed && styles.completedItem]}
              >
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                    <Text
                      style={[
                        styles.itemText,
                        item.completed && styles.completedText,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.itemDesc}>{item.description}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => handelDelete(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>delete</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  card: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
  },
  activeTab: {
    backgroundColor: "#2563EB",
  },
  tabText: {
    color: "#1E3A8A",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  listContainer: {
    marginTop: 20,
  },
  item: {
    backgroundColor: "#E0F2FE",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",   
  },

  completedItem: {
    backgroundColor: "#DCFCE7",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  completedText: {
    textDecorationLine: "line-through",

    color: "#16A34A",
    textDecorationStyle: "double",
  },
  itemDesc: {
    fontSize: 15,
    color: "#334155",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: "center",
    marginLeft: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Home;

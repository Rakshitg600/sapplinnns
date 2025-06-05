// app.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Define TypeScript interfaces
interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  thumbnail: any;
}

interface AppState {
  featuredCourses: Course[];
  popularCourses: Course[];
}

// Mock data for demonstration
const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced Business Strategy',
    instructor: 'Dr. Jane Smith',
    price: 89.99,
    rating: 4.8,
    thumbnail: 'https://s3.collegedisha.com/collegedisha/courses/image/C-Course.webp?tr=w-660,h-286',
  },
  {
    id: '2',
    title: 'Digital Marketing Mastery',
    instructor: 'Prof. John Doe',
    price: 79.99,
    rating: 4.7,
    thumbnail: 'https://s3.collegedisha.com/collegedisha/courses/image/C-Course.webp?tr=w-660,h-286',
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    instructor: 'Dr. Alan Turing',
    price: 99.99,
    rating: 4.9,
    thumbnail: 'https://s3.collegedisha.com/collegedisha/courses/image/C-Course.webp?tr=w-660,h-286',
  },
];

// Main app component
class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      featuredCourses: MOCK_COURSES,
      popularCourses: [...MOCK_COURSES].reverse(),
    };
  }

  renderHorizontalCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.courseCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.instructor}>{item.instructor}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Text style={styles.rating}>★{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderVerticalCourseItem = ({ item }: { item: Course }) => (
    <View style={styles.verticalItemWrapper}>
      <TouchableOpacity style={styles.courseCard}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.instructor}>{item.instructor}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Text style={styles.rating}>★ {item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <StatusBar barStyle="dark-content" />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>EduLearn Pro</Text>
            <TouchableOpacity>
              <Text style={styles.headerButton}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Featured Courses */}
          <Text style={styles.sectionTitle}>Featured Courses</Text>
          <FlatList
            horizontal
            data={this.state.featuredCourses}
            renderItem={this.renderHorizontalCourseItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.courseList}
            showsHorizontalScrollIndicator={false}
          />

          {/* Popular Courses */}
          <Text style={styles.sectionTitle}>Popular This Week</Text>
          <FlatList
            data={this.state.popularCourses}
            renderItem={this.renderVerticalCourseItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.verticalList}
          />
        </SafeAreaView>

        {/* Bottom Navigation - Outside main SafeAreaView */}
        <SafeAreaView style={styles.bottomSafeArea} edges={['bottom', 'left', 'right']}>
          <View style={styles.bottomNav}>
            {['Home', 'Search', 'My Learning', 'Profile'].map((item) => (
              <TouchableOpacity key={item} style={styles.navItem}>
                <Text style={styles.navText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAECEF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  headerButton: {
    fontSize: 16,
    color: '#3A86FF',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    color: '#2D3748',
  },
  courseList: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
  courseCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: 160,
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  instructor: {
    fontSize: 14,
    color: '#718096',
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A86FF',
  },
  rating: {
    fontSize: 16,
    color: '#FBBF24',
  },
  verticalList: {
    paddingVertical: 8,
    paddingBottom: 60, // Extra padding to prevent overlap with bottom nav
  },
  verticalItemWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomSafeArea: {
    backgroundColor: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#EAECEF',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#4A5568',
  },
});

export default App;
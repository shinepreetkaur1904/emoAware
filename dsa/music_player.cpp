#include <iostream>
#include <string>
#include <vector>
#include <ctime>
#include <cstdlib>
using namespace std;

class Song {
public:
    string name;
    Song* next;
    Song* prev;

    Song(string songName) {
        name = songName;
        next = NULL;
        prev = NULL;
    }
};

class MusicPlayer {
private:
    Song* head;
    Song* tail;
    Song* current;

public:
    MusicPlayer() {
        head = tail = current = NULL;
    }

    // Add song
    void addSong(string name) {
        Song* newSong = new Song(name);
        if (!head) {
            head = tail = current = newSong;
        } else {
            tail->next = newSong;
            newSong->prev = tail;
            tail = newSong;
        }
        cout << "Song added: " << name << endl;
    }

    // Delete song
    void deleteSong(string name) {
        Song* temp = head;
        while (temp) {
            if (temp->name == name) {
                if (temp == head) head = temp->next;
                if (temp == tail) tail = temp->prev;
                if (temp->prev) temp->prev->next = temp->next;
                if (temp->next) temp->next->prev = temp->prev;

                if (current == temp)
                    current = head;

                delete temp;
                cout << "Song deleted: " << name << endl;
                return;
            }
            temp = temp->next;
        }
        cout << "Song not found\n";
    }

    // Play current song
    void playCurrent() {
        if (!current) {
            cout << "No songs in playlist\n";
            return;
        }
        cout << "▶ Playing: " << current->name << endl;
    }

    // Play next song
    void playNext() {
        if (current && current->next) {
            current = current->next;
            playCurrent();
        } else {
            cout << "No next song\n";
        }
    }

    // Play previous song
    void playPrevious() {
        if (current && current->prev) {
            current = current->prev;
            playCurrent();
        } else {
            cout << "No previous song\n";
        }
    }

    // Search song
    void searchSong(string name) {
        Song* temp = head;
        while (temp) {
            if (temp->name == name) {
                cout << "Song found: " << name << endl;
                return;
            }
            temp = temp->next;
        }
        cout << "Song not found\n";
    }

    // Display playlist forward
    void displayPlaylist() {
        if (!head) {
            cout << "Playlist empty\n";
            return;
        }
        Song* temp = head;
        cout << "🎶 Playlist:\n";
        while (temp) {
            cout << temp->name << " -> ";
            temp = temp->next;
        }
        cout << "NULL\n";
    }

    // Display playlist backward
    void displayReverse() {
        if (!tail) return;
        Song* temp = tail;
        cout << "🎶 Reverse Playlist:\n";
        while (temp) {
            cout << temp->name << " -> ";
            temp = temp->prev;
        }
        cout << "NULL\n";
    }

    // Shuffle play
    void shufflePlay() {
        vector<Song*> songs;
        Song* temp = head;
        while (temp) {
            songs.push_back(temp);
            temp = temp->next;
        }

        if (songs.empty()) {
            cout << "Playlist empty\n";
            return;
        }

        srand(time(0));
        int idx = rand() % songs.size();
        current = songs[idx];
        playCurrent();
    }

    // Repeat current song
    void repeatSong() {
        if (!current) {
            cout << "No song to repeat\n";
            return;
        }
        cout << "🔁 Repeating: " << current->name << endl;
    }

    // Count songs
    void countSongs() {
        int count = 0;
        Song* temp = head;
        while (temp) {
            count++;
            temp = temp->next;
        }
        cout << "Total songs: " << count << endl;
    }

    // Clear playlist
    void clearPlaylist() {
        Song* temp = head;
        while (temp) {
            Song* nextSong = temp->next;
            delete temp;
            temp = nextSong;
        }
        head = tail = current = NULL;
        cout << "Playlist cleared\n";
    }
};

// Driver Code
int main() {
    MusicPlayer player;

    player.addSong("Believer");
    player.addSong("Shape of You");
    player.addSong("Faded");
    player.addSong("Kesariya");

    player.displayPlaylist();
    player.playCurrent();
    player.playNext();
    player.playPrevious();
    player.searchSong("Faded");
    player.shufflePlay();
    player.repeatSong();
    player.countSongs();
    player.deleteSong("Faded");
    player.displayPlaylist();
    player.displayReverse();

    return 0;
}



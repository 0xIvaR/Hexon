# HEXON Project - Script Control Center

This `scripts/` folder contains convenient Windows batch files to easily manage your HEXON PDF Tools project. Just double-click any `.bat` file to run it!

## 📁 Available Batch Files

### 🔴 `turn-off.bat` - Stop Project
**Purpose**: Stops all HEXON Docker containers
- Stops the web application
- Stops the MongoDB database  
- Removes the Docker network
- Shows success/error messages with colors

**When to use**: When you're done working and want to free up system resources

---

### 🔵 `turn-on.bat` - Start Project  
**Purpose**: Starts your HEXON project with multiple options
- **Option 1**: Normal start (fastest)
- **Option 2**: Start with rebuild (use when you made code changes)
- **Option 3**: Clean start (removes database and rebuilds everything)
- Can automatically open your browser to http://localhost:5000

**When to use**: To start working on your project

---

### 🟡 `project-status.bat` - Check Status
**Purpose**: Shows current project status and provides quick actions
- Displays which containers are running
- Shows ports and connection info
- Provides quick actions based on current status:
  - If running: Open browser, view logs, stop, restart
  - If stopped: Start normal or with rebuild

**When to use**: To check if your project is running or troubleshoot issues

---

### 🟣 `cleanup-files.bat` - File Management
**Purpose**: Manages uploaded files in the `uploads/` folder
- Shows current files and total size
- Multiple cleanup options:
  - View file details (sizes and dates)
  - Delete files older than 7 days
  - Delete files older than 30 days  
  - Delete all PDF outputs (merged_*, converted_*, imagepdf_*)
  - Delete ALL files (with safety confirmation)
  - Delete specific file types

**When to use**: When your uploads folder gets too large and you want to clean up old files

## 🚀 Quick Start Guide

1. **First time setup**: Double-click `turn-on.bat` → Choose option 2 (rebuild)
2. **Daily use**: Double-click `turn-on.bat` → Choose option 1 (normal start)
3. **Check if running**: Double-click `project-status.bat`
4. **When finished**: Double-click `turn-off.bat`
5. **Clean up files**: Double-click `cleanup-files.bat` weekly/monthly

## 🎨 Color Coding

The batch files use colors to indicate status:
- 🔴 **Red**: Errors or warnings
- 🟢 **Green**: Success messages
- 🔵 **Blue**: Information and options
- 🟡 **Yellow**: Status and actions
- 🟣 **Purple**: File management

## 📍 Important Notes

### Prerequisites
- **Docker Desktop must be running** before using turn-on.bat
- Run these files from the **`scripts/` folder** (or create desktop shortcuts)
- Make sure you have **Administrator privileges** if you encounter permissions issues

### File Locations
```
C:\Users\soham\Coding\Web Apps\Hexon\
├── scripts/                  ← YOU ARE HERE
│   ├── turn-on.bat          ← 🔵 Start project
│   ├── turn-off.bat         ← 🔴 Stop project  
│   ├── project-status.bat   ← 🟡 Check status
│   ├── cleanup-files.bat    ← 🟣 Manage files
│   └── README.md            ← 📖 This guide
├── uploads/                 ← Your processed PDF files
├── docker-compose.yml       ← Project configuration
└── ...                      ← Other project files
```

### Access URLs
- **Main Application**: http://localhost:5000
- **MongoDB Database**: localhost:27017

## 🔧 Troubleshooting

### Common Issues & Solutions

**"Docker is not running"**
- Start Docker Desktop application
- Wait for Docker to fully initialize (green icon in system tray)

**"Port already in use"**  
- Check if another application is using ports 5000 or 27017
- Use `project-status.bat` to see what's running

**"Permission denied"**
- Right-click the batch file → "Run as Administrator"
- Make sure Docker Desktop is running with proper permissions

**"Files not found"**
- Make sure the batch files are in the `scripts/` folder
- Check that the HEXON project folder structure is intact

## 💡 Pro Tips

1. **Create desktop shortcuts**: 
   - Right-click any .bat file → Send to → Desktop (create shortcut)
   - This way you can run them from anywhere!

2. **Pin to taskbar**: 
   - Create shortcuts and pin them for even faster access

3. **Keyboard shortcuts**: 
   - Create shortcuts and assign keyboard shortcuts (Right-click → Properties → Shortcut key)

4. **Regular cleanup**: 
   - Use `cleanup-files.bat` weekly to maintain good performance

5. **Monitor status**: 
   - Use `project-status.bat` to check logs if something isn't working

6. **Safe rebuilds**: 
   - Use option 3 in `turn-on.bat` if you encounter persistent issues

## 🎯 Desktop Shortcuts Guide

**To create desktop shortcuts for easy access:**

1. Right-click on any `.bat` file in this folder
2. Select "Send to" → "Desktop (create shortcut)"
3. Rename the shortcut (e.g., "HEXON Start", "HEXON Stop")
4. Optionally, change the icon:
   - Right-click shortcut → Properties → Change Icon
   - Choose from Windows icons or download custom icons

**Recommended shortcuts to create:**
- `turn-on.bat` → "🔵 Start HEXON"
- `turn-off.bat` → "🔴 Stop HEXON"  
- `project-status.bat` → "🟡 HEXON Status"

## 📞 Support

If you encounter issues:
1. Try `project-status.bat` to diagnose the problem
2. Check Docker Desktop is running and updated
3. Try "Clean Start" option in `turn-on.bat`
4. Check the Docker Desktop logs for detailed error messages

## 🗂️ Organization Benefits

**Why we moved scripts to a folder:**
- ✅ **Cleaner project root** - Less clutter in main directory
- ✅ **Better organization** - All management tools in one place
- ✅ **Easier maintenance** - Scripts grouped together
- ✅ **Desktop shortcuts** - Create shortcuts that work from anywhere
- ✅ **Version control** - Scripts folder can be easily managed

---

**Happy PDF processing with HEXON! 🎯**

**Quick Access**: Create desktop shortcuts and manage your project with a single double-click! 
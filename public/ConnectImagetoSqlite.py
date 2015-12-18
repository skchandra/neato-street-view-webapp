import os
import sqlite3


class Database(object):
	"""Creating and inserting the panorama image files into sqlite database"""
	def __init__(self, save_path):
		self. save_path = save_path
		self.fileDict = {}
		self.databaseName = 'PanoramaDatabase.db'
		self.conn = sqlite3.connect(self.databaseName)
		print "Open database, " + self.databaseName + " successfully!"

	def loopThroughFiles(self):
		"loop through all image files and store abs path in fileDict"
		self.hierachyList = []
		for file in os.listdir(self.save_path):
			self.fileDict[file] = os.path.join(self.save_path,file)
			hierachy = file[:-4]
			hierachy = hierachy.split(",")
			self.hierachyList.append(float(hierachy[2]))			
			# print os.path.abspath(os.path.join(save_path,file))
		self.hierachyList = sorted(self.hierachyList)
		print self.hierachyList
		print "Total file number is:", len(self.fileDict)


	def createTable(self):
		"check if table exists. if not, create the table"
		self.conn.execute('''CREATE TABLE IF NOT EXISTS {} (
       X           INT    NOT NULL,
       Y            INT     NOT NULL,
       Deg        INT NOT NULL,
       Address     Text NOT NULL)'''.format('panoramaIter1'))

	def insertData(self):
		"loop through each image and insert it into the table"
		with self.conn:
			for key,value in self.fileDict.iteritems():
				key = key[:-4]
				key = key.split(",")
				x , y, deg = float(key[0]), float(key[1]), self.hierachyList.index(float(key[2]))
				self.conn.execute("INSERT INTO panoramaIter1 (X,Y,Deg,Address)VALUES(?,?,?,?)", (x,y,deg,value))
				# print key[2]
				# print self.hierachyList.index(float(key[2]))
	def run(self):
		self.loopThroughFiles()
		self.createTable()
		self.insertData()
if __name__ == '__main__':
	folderName = "37.0,22.0"
	Database ('./images/'+folderName ).run()
